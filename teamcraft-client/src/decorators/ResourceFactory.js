export function ResourceFactory(options = {}) {
    const resources = [];
    const subs = [];
    return function (Clazz) {
        Clazz.resources = resources;
        Clazz.subs = subs;
        // Publish/Subscribe
        Clazz.publish = function () {
            Clazz.subs.forEach((sub) => sub(Clazz.resources));
        };
        Clazz.unsubscribe = function (sub) {
            Clazz.subs = Clazz.subs.filter((_sub) => _sub !== sub);
        };
        Clazz.subscribe = function (sub) {
            Clazz.subs.push(sub);
            return () => Clazz.unsubscribe(sub);
        };
        // CRUD Methods
        Clazz.find = options.find || null;
        Clazz.create = function () {
            const resource = new Clazz(...arguments);
            Clazz.add(resource);
            return resource;
        };
        Clazz.add = function (resource) {
            Clazz.resources = [...Clazz.resources, resource];
            Clazz.publish();
        };
        Clazz.remove = function (resource) {
            Clazz.resources = Clazz.resources.filter((_resource) => _resource !== resource);
            Clazz.publish();
        };
    };
}
