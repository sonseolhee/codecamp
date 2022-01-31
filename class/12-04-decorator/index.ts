function zzz(aaa) {
  console.log("====================");
  console.log(aaa);
  console.log("====================");
}

@zzz
class AppController {}

interface Iup {
  a: string;
  b?: string;
}

const up: Iup = {
  a: "a",
  b: "b",
};

const up2: Iup = {
  a: "a",
};
