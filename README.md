## AGRPro documentation

This repository holds the source files used to generate AGRPro plugin documentation.

It uses Gatsby to generate a static website based on [@rocketseat/gatsby-theme-docs fork](https://github.com/mklabs/gatsby-themes/tree/main/%40rocketseat/gatsby-theme-docs) gatsby plugin and theme.

The API generated from the plugin source for all Blueprint exposed UPROPERTIes and UFUNCTIONs is done using [KantanDocGenPlugin](https://github.com/kamrann/KantanDocGenPlugin), but using a [fork](https://github.com/mklabs/KantanDocGenPlugin) of it to accommodate our need to support UPROPERTY for variables and BlueprintAssignable events for components.

## Install

To run the website locally, you'll need [nodejs](https://nodejs.org/en/) installed on your machine. Once done, run:

```
npm install
npm run dev
```

## Generate API documentation

First, you'll need to install [KantanDocGenPlugin fork](https://github.com/mklabs/KantanDocGenPlugin) in your local AGRPro host project Plugins' folder.

From within your development project for AGR Pro

```
git clone https://github.com/mklabs/KantanDocGenPlugin.git Plugins/KantanDocGenPlugin
```

Then open up the project and enable KantanDocGenPlugin plugin, then recompile the project (or restart the editor directly, on first clone Unreal will ask you to build the modules when the plugin is enabled)