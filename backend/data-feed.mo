import Text "mo:base/Text";

class DataFeed(endpoint: Text) {
    public let url = endpoint;
    var feed_data = "";

    public func update(data: Text) {
        feed_data := data;
    };

    public func data(): Text {
        return feed_data;
    }
}