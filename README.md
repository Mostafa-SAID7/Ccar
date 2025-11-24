# Ccar

A comprehensive car management system with multiple platform support.

## Project Structure

- **src/** - .NET backend application (Clean Architecture)
  - Application Layer
  - Domain Layer
  - Infrastructure Layer
  - Persistence Layer
  - WebAPI

- **ML/** - Machine Learning components
  - Python-based ML models and services

- **mobile/** - Flutter mobile application
  - Cross-platform mobile app

- **ClientApp/** - Web client application

## Getting Started

### Prerequisites

- .NET SDK 8.0 or later
- Python 3.8+
- Flutter SDK
- Node.js (for ClientApp)

### Backend Setup

```bash
cd src
dotnet restore
dotnet build
```

### ML Setup

```bash
cd ML
pip install -r requirements.txt
python main.py
```

### Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See LICENSE file for details.
