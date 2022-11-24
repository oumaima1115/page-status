import Resolver from '@forge/resolver';
import ForgeUI, { render,useEffect,StatusLozenge,Badge,Text,
  Fragment, Select, Option, useConfig, CheckboxGroup, 
  Checkbox, Macro, useProductContext, useState ,MacroConfig,
  TextField} from '@forge/ui';
  
  import api, { route } from "@forge/api";

  let date = new Date();
  let defaultConfig = {
    text: "",
    width: "",
    date: date,
    status: "DRAFT"
  };
  
  // resolver.define("changeStatus", ({ payload, context }) => {
  //   return defaultConfig;
  // });

const resolver = new Resolver();
resolver.define("getText", ({ payload, context }) => {
  const configuration = context.extension.config || defaultConfig;
  console.log("useConfig():",useConfig())
  console.log("configuration:",configuration)
  return configuration;
});


export const handler = resolver.getDefinitions();

const Config = () => {
  return (
    <MacroConfig>
      <TextField name="text" label="Additional text" defaultValue={defaultConfig.text} />
      <TextField name="width" label="Width" defaultValue={defaultConfig.width}  description="Example: 400px or 50%"/>
      <Select name="status" label="status" placeholder="Select..." Value={defaultConfig.status}>
        <Option label="DRAFT" value="DRAFT" />
        <Option label="ACTION REQUIRED" value="ACTION REQUIRED" />
        <Option label="OFFICIAL" value="OFFICIAL" />
        <Option label="OUTDATED" value="OUTDATED" />
      </Select>
    </MacroConfig>
  );
};
export const config = render(<Config />);

