package net.smarthaccp.demand.handler;

public class ReadStreamHandler {

    private static String readStream(java.io.InputStream inputStream) throws java.io.IOException {
        try (java.util.Scanner s = new java.util.Scanner(inputStream).useDelimiter("\\A")) {
            return s.hasNext() ? s.next() : "";
        }
    }
}
