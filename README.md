# ECI Logistics dashboard

Logistics KPI dashboard for ECI Morocco (P300). Viewers click **Update data** and pick the
logistics Excel (from OneDrive or their PC). The file is read in the browser only – no data is
stored on Netlify or GitHub. Each device shows the last file loaded until a new one is picked.

Microsoft sign-in (reading OneDrive automatically) is built in but inactive: it needs an Entra
app registration from IT (see below). Until `clientId`/`tenantId` are set, the page stays in upload mode.

## Files
- `index.html` – the dashboard (sign-in settings in the `CFG` block at the top of the script)
- `excel/` – Excel template and test files

## Sign-in settings (`CFG` in index.html)
- `clientId` – Application (client) ID from the Entra app registration
- `tenantId` – Directory (tenant) ID
- `fileLink` – OneDrive share link of the logistics Excel (ECI-only link)

## Entra app registration
- Supported account types: accounts in this organizational directory only
- Redirect URI: platform **Single-page application**, `https://<site>.netlify.app/`
- API permissions (Microsoft Graph, delegated): `User.Read`, `Files.Read.All`

## Netlify
Import this repository; build command empty, publish directory `.`.
Every push to `main` republishes the site.
