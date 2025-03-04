import { Subscription } from 'rxjs';

export class SubscriptionSink {
  private readonly subscriptions = new Subscription();

  set sink(subscription: Subscription) {
    this.subscriptions.add(subscription);
  }

  unsubscribe() {
    this.subscriptions.unsubscribe();
  }
}
