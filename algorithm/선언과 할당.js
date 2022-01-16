let arr = [1, "Hi", {key:"value"}, ["2"], 2]

//add
arr.push(5)
arr.unshift("nice")

//delete
arr.pop()
arr.shift()

//search
arr.indexOf(1)  //0
arr.indexOf(9)  //-1

arr.includes('Hi')  //true(false)


console.log(arr)

