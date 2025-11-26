import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="active" class="animate-fade-in">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
    @Input() title = '';
    @Input() icon = '';
    @Input() disabled = false;
    active = false;
}

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex flex-col w-full">
      <!-- Tab Headers -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            *ngFor="let tab of tabs"
            [class]="getTabClasses(tab)"
            [disabled]="tab.disabled"
            (click)="selectTab(tab)"
            type="button"
          >
            <!-- Icon -->
            <span *ngIf="tab.icon" class="mr-2">
              <i [class]="tab.icon"></i>
            </span>
            {{ tab.title }}
            
            <!-- Active Indicator -->
            <span
              *ngIf="tab.active"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-t-md"
            ></span>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="mt-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
    @Output() tabChange = new EventEmitter<TabComponent>();

    ngAfterContentInit() {
        // Select first tab by default if no active tab
        const activeTabs = this.tabs.filter(tab => tab.active);
        if (activeTabs.length === 0 && this.tabs.length > 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: TabComponent) {
        if (tab.disabled) return;

        // Deactivate all tabs
        this.tabs.toArray().forEach(t => t.active = false);

        // Activate selected tab
        tab.active = true;

        this.tabChange.emit(tab);
    }

    getTabClasses(tab: TabComponent): string {
        const baseClasses = 'group relative min-w-0 flex-1 overflow-hidden py-4 px-1 text-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-10 focus:outline-none transition-colors duration-200 cursor-pointer';

        const activeClasses = tab.active
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300';

        const disabledClasses = tab.disabled
            ? 'opacity-50 cursor-not-allowed'
            : '';

        return `${baseClasses} ${activeClasses} ${disabledClasses}`;
    }
}
