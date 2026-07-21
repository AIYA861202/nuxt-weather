export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runFiveTimes() {
  for (let i = 0; i < 5; i++) {
    console.log(`第：${i + 1}次`);
    await delay(3000); // Wait for 3 seconds
  }
}

// 基本型別
let str :string = "Hello, TypeScript!";
let num :number = 42;
let bool :boolean = true;
let nul :null = null;
let unde :undefined = undefined;

let test: any = "This can be any type";

// 陣列
let arr: number[] = [1, 2, 3, 4, 5];
let arr1: string[] = ["apple", "banana", "cherry"];
let arr2: Array<string> = ["apple", "banana", "cherry"];
let arr3: Array<number> = [1, 2, 3, 4, 5];
let arr4: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// 元組
let tuple: [string, number,boolean] = ["Hello", 42,true]; // 指定類型順序
let tuple2: (string | number | boolean)[] = [ 42, "Hello", true]; // 元組的另一種寫法，不限順序只列出可能的類型
let tuple3: [string, number,boolean] = [42, true, "Hello"]; // 這裡會報錯，因為 tuple3 的順序不符合定義的類型順序

// Enum 枚舉
enum OrderStatus {
  SUCCESS = 1,
  FAIL = -1,
  PENDING = 0
}
const successOrder: OrderStatus = OrderStatus.SUCCESS;
const waitingOrder: OrderStatus = OrderStatus.WAITING; // 這裡會報錯，因為 OrderStatus 中沒有 WAITING

// Union Types 聯合類型
let unionVar: string | number;
unionVar = "Hello";
unionVar = 42;
unionVar = true; // 這裡會報錯，因為 unionVar 只允許 string 或 number

// type 別名
type StringOrNumber = string | number; // 定義一個type，表示可以是 string 或 number
let aliasVar: StringOrNumber;
aliasVar = "Hello";
aliasVar = 42;
let aliasVar2: StringOrNumber;
aliasVar2 = "Bye";
aliasVar2 = 100;
aliasVar2 = true; // 這裡會報錯，因為 StringOrNumber 只允許 string 或 number

// interface
interface Person {
  name: string;
  age: number;
}

interface Person {
  gender: string;
  job?: string; // 可選屬性(可沒有job (undefined))，可選屬性得放在比選屬性的後面
}

// 使用 interface 定義一個物件(interface 可以被擴充(擴充了gender。type 不能擴充))
const person: Person = {
  name: "John",
  age: 30,
  gender: "female"
};

// Functions 函數
function add(a: number, b: number): number { // (指定參數型別,指定參數型別): 指定回傳型別
  return a + b;
}

function add2(a: string, b: string): number { // 報錯，因為回傳型別指定為 number，但實際上回傳的是 string
  return a + b;
}

function add3(a: number, b?: number) {
  if (b !== undefined) { // 檢查 b 是否有傳入值，因為沒傳入值的話 b 會是 undefined，無法計算而報錯
    return a + b;
  } else {
    return a;
  }
}

// Unknown 斷言
async function fetchData(){
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data: unknown = await res.json(); // 將回傳的資料型別指定為 unknown，因為我們不確定回傳的資料型別是什麼
  return data;
}

// 2.若要指定型別：
type dataType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
async function fetchData2(){
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json() as dataType; // 3. 將回傳的資料型別指定為 dataType
  return data;
}