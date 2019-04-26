export function ResourcePubSub(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.subs = [];
        }
        publish(data) {
            this.subs.forEach(sub => sub(data));
        }
        unsubscribe(sub) {
            this.subs = this.subs.filter(_sub => _sub !== sub);
        }
        subscribe(sub) {
            this.subs = [...this.subs, sub];
            return () => this.unsubscribe(sub);
        }
    };
}
