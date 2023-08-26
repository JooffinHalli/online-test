declare namespace Http {
  declare type RequestHeaders = _Headers | DeepReadonly<_Headers>
  declare type Method =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "CONNECT"
    | "TRACE"
}

type _Headers = {
  "Content-Type"?:
    | "application/EDI-X12"
    | "application/EDIFACT"
    | "application/javascript"
    | "application/octet-stream"
    | "application/ogg"
    | "application/pdf"
    | "application/xhtml+xml"
    | "application/x-shockwave-flash"
    | "application/json"
    | "application/ld+json"
    | "application/xml"
    | "application/zip"
    | "application/x-www-form-urlencoded"

    | "audio/mpeg"
    | "audio/x-ms-wma"
    | "audio/vnd.rn-realaudio"
    | "audio/x-wav"

    | "image/gif"
    | "image/jpeg"
    | "image/png"
    | "image/tiff"
    | "image/vnd.microsoft.icon"
    | "image/x-icon"
    | "image/vnd.djvu"
    | "image/svg+xml"

    | "multipart/mixed"
    | "multipart/alternative"
    | "multipart/related"
    | "multipart/form-data"

    | "text/css"
    | "text/csv"
    | "text/html"
    | "text/javascript"
    | "text/plain"
    | "text/xml"

    | "video/mpeg"
    | "video/mp4"
    | "video/quicktime"
    | "video/x-ms-wmv"
    | "video/x-msvideo"
    | "video/x-flv"
    | "video/webm"

    | "application/vnd.oasis.opendocument.text"
    | "application/vnd.oasis.opendocument.spreadsheet"
    | "application/vnd.oasis.opendocument.presentation"
    | "application/vnd.oasis.opendocument.graphics"
    | "application/vnd.ms-excel"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    | "application/vnd.ms-powerpoint"
    | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    | "application/msword"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.mozilla.xul+xml"

  "Content-Length"?: number

  "Content-Disposition"?:
    | "form-data"
    | `form-data; name="${string}"`
    | `form-data; name="${string}"; filename="${string}"`
}

type DeepReadonly<T> = keyof T extends never
  ? T
  : { readonly [k in keyof T]: DeepReadonly<T[k]> };