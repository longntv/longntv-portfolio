import { CgCPlusPlus } from "react-icons/cg";
import { DiJava } from "react-icons/di";
import { TbBrandGolang } from "react-icons/tb";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNodedotjs, SiNextdotjs, SiVuedotjs, SiAngular,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiDocker, SiKubernetes, SiGit, SiLinux,
  SiAmazonaws, SiGooglecloud, SiNginx, SiGraphql, SiKotlin, SiSwift, SiRust, SiPhp, SiLaravel,
  SiDjango, SiFlask, SiSpring, SiElasticsearch, SiApachekafka, SiRabbitmq, SiTailwindcss, SiFlutter,
  SiVisualstudiocode, SiPostman, SiFigma, SiJira, SiSlack, SiMacos, SiUbuntu, SiVercel, SiTensorflow,
  SiPytorch, SiSolidity, SiCsharp, SiDotnet, SiJenkins, SiTerraform, SiGithubactions,
} from "react-icons/si";

// Lower-cased skill name -> icon. Skills without an icon are shown as text only.
const ICONS = {
  "c++": CgCPlusPlus, java: DiJava, go: TbBrandGolang, golang: TbBrandGolang,
  javascript: SiJavascript, typescript: SiTypescript, python: SiPython, react: SiReact, "react.js": SiReact,
  "node.js": SiNodedotjs, nodejs: SiNodedotjs, "next.js": SiNextdotjs, nextjs: SiNextdotjs, vue: SiVuedotjs,
  angular: SiAngular, mongodb: SiMongodb, postgresql: SiPostgresql, postgres: SiPostgresql, mysql: SiMysql,
  redis: SiRedis, firebase: SiFirebase, docker: SiDocker, kubernetes: SiKubernetes, k8s: SiKubernetes,
  git: SiGit, linux: SiLinux, aws: SiAmazonaws, gcp: SiGooglecloud, "google cloud": SiGooglecloud,
  nginx: SiNginx, graphql: SiGraphql, kotlin: SiKotlin, swift: SiSwift, rust: SiRust, php: SiPhp,
  laravel: SiLaravel, django: SiDjango, flask: SiFlask, spring: SiSpring, "spring boot": SiSpring,
  elasticsearch: SiElasticsearch, kafka: SiApachekafka, rabbitmq: SiRabbitmq, tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss, flutter: SiFlutter, "vs code": SiVisualstudiocode, vscode: SiVisualstudiocode,
  postman: SiPostman, figma: SiFigma, jira: SiJira, slack: SiSlack, macos: SiMacos, ubuntu: SiUbuntu,
  vercel: SiVercel, tensorflow: SiTensorflow, pytorch: SiPytorch, solidity: SiSolidity, "c#": SiCsharp,
  ".net": SiDotnet, jenkins: SiJenkins, terraform: SiTerraform, "github actions": SiGithubactions,
};

export const skillIcon = (name) => ICONS[String(name).trim().toLowerCase()];
