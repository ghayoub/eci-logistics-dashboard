# ECI Logistics dashboard

Logistics KPI dashboard for ECI Morocco (P300). The page reads `data.xlsx` from OneDrive
with each viewer's own ECI Microsoft sign-in – no data is stored on Netlify or GitHub.

## Files
- `index.html` – the dashboard (sign-in settings in the `CFG` block at the top of the script)
- `data.xlsx` – demo data, used only until sign-in is configured
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
