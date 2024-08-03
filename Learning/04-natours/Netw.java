import java.io.IOException;
import java.net.URI;
import java.net.http.*;

public class Netw{
    public static void main(String[] args) throws IOException, InterruptedException{
        HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://127.0.0.1:3000/api/v1/tours?page=3&limit=3"))
    .header("Accept", "*/*")
    .header("User-Agent", "Thunder Client (https://www.thunderclient.com)")
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response;
try {
    response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
} catch (IOException | InterruptedException e) {
    // TODO Auto-generated catch block
    e.printStackTrace();
}
response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
    }
}