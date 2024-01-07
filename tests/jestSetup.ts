import { jest } from "@jest/globals";

global.jest = jest;
// ESM化したら、ReferenceError: jest is not defined が出るので追加
// ref: https://japanese-document.github.io/tips/2023/javascript-jest-is-not-defined.html
