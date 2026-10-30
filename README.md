# ECI Logistics dashboard – live from OneDrive

Files
  index.html                    the dashboard
  data.xlsx                     backup data, shown only if OneDrive can't be reached
  netlify/functions/data.mjs    reads the Excel from OneDrive (at /api/data)
  netlify.toml                  tells Netlify where things are

1. OneDrive link
   Open the Excel in OneDrive > Share > "Anyone with the link can view" > Copy link.

2. GitHub (functions don't work with drag-and-drop)
   github.com > New repository (Private) > "uploading an existing file"
   > drag ALL the files and the "netlify" folder > Commit changes.

3. Netlify
   Add new site > Import an existing project > GitHub > choose the repository.
   Build command: (empty)   Publish directory: .   > Deploy.

4. The link
   Site configuration > Environment variables > Add a variable
   Key: ONEDRIVE_URL   Value: the OneDrive link from step 1
   Then Deploys > Trigger deploy > Deploy site.

5. Check
   Open https://<your-site>.netlify.app/api/data – the Excel should download.
   The dashboard header shows "Updated … · live".

Daily use: just save the Excel in OneDrive. The page shows the change within about a minute.

Excel files (not used by the site)
  excel/ECI_Logistics_KPI_Data.xlsx   empty-format template
  excel/Test_A_full_history.xlsx      test data
  excel/Test_B_crisis_and_errors.xlsx test data with deliberate errors
