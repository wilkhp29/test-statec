import App from "./App";

App.listen(process.env.PORT ||3000, () => {
  console.log(`servidor on http://localhost:${process.env.PORT ||3000}`);
});
