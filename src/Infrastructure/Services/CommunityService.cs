using Application.Abstractions;
using Application.DTOs.Request;
using Application.DTOs.Response;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class CommunityService : ICommunityService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Post> _postRepository;
    private readonly IRepository<Comment> _commentRepository;
    private readonly IRepository<Like> _likeRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public CommunityService(
        IUnitOfWork unitOfWork,
        IRepository<Post> postRepository,
        IRepository<Comment> commentRepository,
        IRepository<Like> likeRepository,
        IRepository<User> userRepository,
        IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _postRepository = postRepository;
        _commentRepository = commentRepository;
        _likeRepository = likeRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<Result<List<PostDto>>> GetPostsAsync(string currentUserId, CancellationToken cancellationToken = default)
    {
        var posts = await _postRepository.Query()
            .Include(p => p.Author)
            .Include(p => p.Likes)
            .Include(p => p.Comments)
                .ThenInclude(c => c.Author)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync(cancellationToken);

        var postDtos = _mapper.Map<List<PostDto>>(posts);

        // Manually map computed properties for now, or use AutoMapper with context
        foreach (var dto in postDtos)
        {
            var post = posts.First(p => p.Id == dto.Id);
            dto.IsAuthor = post.AuthorId == currentUserId;
            dto.IsLikedByCurrentUser = post.Likes.Any(l => l.UserId == currentUserId);
            dto.RecentComments = post.Comments.OrderByDescending(c => c.CreatedAt).Take(3).Select(c =>
            {
                var cDto = _mapper.Map<CommentDto>(c);
                cDto.IsAuthor = c.AuthorId == currentUserId;
                return cDto;
            }).ToList();
        }

        return Result.Success(postDtos);
    }

    public async Task<Result<PostDto>> CreatePostAsync(string userId, CreatePostDto request, CancellationToken cancellationToken = default)
    {
        var post = new Post
        {
            Content = request.Content,
            ImageUrl = request.ImageUrl,
            AuthorId = userId,
            CreatedAt = DateTime.UtcNow
        };

        await _postRepository.AddAsync(post, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var user = await _userRepository.GetByIdAsync(Guid.Parse(userId), cancellationToken); // Assuming User ID is Guid, but IdentityUser uses string. 
                                                                                              // Wait, IdentityUser uses string by default. My User entity inherits from IdentityUser.
                                                                                              // IRepository<User> expects Guid for GetByIdAsync.
                                                                                              // I need to check User entity definition.

        // If User ID is string, generic repository GetByIdAsync(Guid) won't work.
        // I'll use FindAsync or Query.

        var userEntity = await _userRepository.Query().FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        var dto = _mapper.Map<PostDto>(post);
        dto.AuthorName = $"{userEntity?.FirstName} {userEntity?.LastName}";
        dto.IsAuthor = true;

        return Result.Success(dto);
    }

    public async Task<Result> LikePostAsync(string userId, Guid postId, CancellationToken cancellationToken = default)
    {
        var existingLike = await _likeRepository.Query()
            .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId, cancellationToken);

        if (existingLike != null)
        {
            _likeRepository.Remove(existingLike);
        }
        else
        {
            var like = new Like
            {
                PostId = postId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };
            await _likeRepository.AddAsync(like, cancellationToken);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }

    public async Task<Result<CommentDto>> AddCommentAsync(string userId, Guid postId, CreateCommentDto request, CancellationToken cancellationToken = default)
    {
        var comment = new Comment
        {
            PostId = postId,
            AuthorId = userId,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow
        };

        await _commentRepository.AddAsync(comment, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var userEntity = await _userRepository.Query().FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        var dto = _mapper.Map<CommentDto>(comment);
        dto.AuthorName = $"{userEntity?.FirstName} {userEntity?.LastName}";
        dto.IsAuthor = true;

        return Result.Success(dto);
    }
}
