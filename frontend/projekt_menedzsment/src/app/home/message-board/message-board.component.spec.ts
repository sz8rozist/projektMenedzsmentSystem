import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoardComponent } from './message-board.component';

describe('MessageBoardComponent', () => {
  let component: MessageBoardComponent;
  let fixture: ComponentFixture<MessageBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageBoardComponent]
    });
    fixture = TestBed.createComponent(MessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
