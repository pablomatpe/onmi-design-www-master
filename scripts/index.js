/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const WPAPI = require("wpapi");
const dotenv = require("dotenv");

dotenv.config();

const apiUrl = process.env.NEXT_PUBLIC_ONMI_API_URL;

const wp = new WPAPI({ endpoint: apiUrl });
wp.getFooter = wp.registerRoute("global/v1", "/footer");
wp.getScripts = wp.registerRoute("global/v1", "/scripts");

wp.getScripts().then(({ data = {} }) => {
  const scriptsPath = "src/_contents/scripts.json";
  fs.writeFileSync(scriptsPath, JSON.stringify(data, null, 4));
});

wp.getFooter().then(({ data = {} }) => {
  const footerPath = "src/_contents/footer.json";
  fs.writeFileSync(footerPath, JSON.stringify(data, null, 4));
});
