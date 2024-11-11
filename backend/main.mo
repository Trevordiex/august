import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Principal "mo:base/Principal";


//import the custom types you have in Types.mo
import Types "Types";
import DataFeed "data-feed";


//Actor
actor {
  private var API_KEY = "3iyrKBoEtplC67FFiBR8IgQDAlpBLxB7KfXVNOH9YNY=";
  private let host : Text = "openapiv1.coinstats.app";
  private let ic : Types.IC = actor ("aaaaa-aa");

  private var markets_data = DataFeed.DataFeed("markets");
  private var coins_data = DataFeed.DataFeed("coins");
  private var fiats_data = DataFeed.DataFeed("fiats");
  private var currencies_data = DataFeed.DataFeed("currencies");


  public query({caller}) func getAccount(): async Principal {
    return caller
  };


  public query func get(selector: Text): async Text {
    let item = switch(selector) {
      case("markets") { markets_data};
      case("currencies") { currencies_data};
      case("fiats") { fiats_data};
      case(_) {coins_data};
    };

    item.data();
  };

  private func latest(selector: Text): async Text {
    let item = switch(selector) {
      case("markets") { markets_data};
      case("currencies") { currencies_data};
      case("fiats") { fiats_data};
      case(_) {coins_data};
    };

    let url = "https://" # host # "/" # item.url;

    let response = await call_endpoint(#get, url);
    item.update(response);
    response;
  };


  system func timer(setGlobalTimer : Nat64 -> ()) : async () {
    let next = Nat64.fromIntWrap(Time.now()) + 1_000_000_000 * 60 * 10;

    let items = ["coins", "markets", "currencies", "fiats"];

    for (item in items.vals()) {
      let _ = await latest(item);
    };

    setGlobalTimer(next); // absolute time in nanoseconds
  };

  private func call_endpoint(method: Types.HttpMethod, url: Text): async Text {

    // 2.2 prepare headers for the system http_request call
    let request_headers = [
        { name = "Host"; value = host },
        { name = "User-Agent"; value = "exchange_rate_canister" },
        { name = "X-API-KEY"; value = API_KEY },
        { name = "accept"; value = "application/json"}
    ];

    // 2.2.1 Transform context
    let transform_context : Types.TransformContext = {
      function = transform;
      context = Blob.fromArray([]);
    };

    // 2.3 The HTTP request
    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        body = null; //optional for request
        method = method;
        transform = ?transform_context;
    };


    Cycles.add(20_949_972_000);

    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);


    let response_body: Blob = Blob.fromArray(http_response.body);
    let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    decoded_text
  };

  //7. CREATE TRANSFORM FUNCTION
  public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
      let transformed : Types.CanisterHttpResponsePayload = {
          status = raw.response.status;
          body = raw.response.body;
          headers = [
              {
                  name = "Content-Security-Policy";
                  value = "default-src 'self'";
              },
              { name = "Referrer-Policy"; value = "strict-origin" },
              { name = "Permissions-Policy"; value = "geolocation=(self)" },
              {
                  name = "Strict-Transport-Security";
                  value = "max-age=63072000";
              },
              { name = "X-Frame-Options"; value = "DENY" },
              { name = "X-Content-Type-Options"; value = "nosniff" },
          ];
      };
      transformed;
  };
};