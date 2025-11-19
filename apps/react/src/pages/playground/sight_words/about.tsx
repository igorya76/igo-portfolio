export default function () {
  return {
    title: `
      QR Code Scanner
    `,
    summary: `
      Generate and Scan QR codes from your mobile device including some websocket communication fun. 
    `,
    details: `
      ## Goals
      * Generate QR Codes  
      * Read QR Codes
      * Detect if viewed on a web (wide screen, preferablly desktop) or a mobile browser.
      * If viewed on web display a single QR Code that when scanned with a mobile devices
        camera, opens the mobile version in the browser.
      * Following the mobile version opening, a unique session is created and the web view changes
        to display types of QR Codes.
      * The mobile view contains a QR Scanner, upon scan of a QR code in the browser the following happens:
          * Web: Active QR Code gets highlighed
          * Mobile: A drawer appears display the content type and content type
      * QR Codes containing the following to be supported:
          * URL
          * Text
          * Data as JSON
    `,
  };
}
