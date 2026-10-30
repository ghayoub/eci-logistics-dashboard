// Reads the logistics Excel live from OneDrive and hands it to the page at /api/data.
// Set the OneDrive share link ("Anyone with the link") in Netlify:
//   Site configuration > Environment variables > ONEDRIVE_URL
const XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const fail = (status, error) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const b64url = (s) =>
  Buffer.from(s).toString("base64").replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");

function candidates(link) {
  const out = [];
  try {
    const u = new URL(link);
    u.searchParams.set("download", "1");
    out.push(u.toString()); // OneDrive for Business / SharePoint "Anyone" links
  } catch (_) {}
  out.push("https://api.onedrive.com/v1.0/shares/u!" + b64url(link) + "/root/content"); // personal OneDrive links
  out.push(link);
  return [...new Set(out)];
}

export default async () => {
  const link = (process.env.ONEDRIVE_URL || "").trim();
  if (!link) return fail(500, "ONEDRIVE_URL is not set in Netlify");

  let last = "no answer";
  for (const url of candidates(link)) {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 ECI-dashboard" } });
      if (!r.ok) { last = "HTTP " + r.status; continue; }
      const buf = new Uint8Array(await r.arrayBuffer());
      if (buf[0] === 0x50 && buf[1] === 0x4b) {           // real .xlsx (zip) file
        return new Response(buf, {
          headers: {
            "content-type": XLSX,
            "cache-control": "no-store",                             // browsers always ask again
            "netlify-cdn-cache-control": "public, s-maxage=60, stale-while-revalidate=120", // OneDrive read at most once a minute
            "x-source-modified": r.headers.get("last-modified") || new Date().toUTCString(),
          },
        });
      }
      last = "the link opened a web page, not the file";
    } catch (e) {
      last = String(e.message || e);
    }
  }
  return fail(502, 'OneDrive did not return the Excel (' + last + '). Check the link is shared with "Anyone with the link"');
};

export const config = { path: "/api/data" };
