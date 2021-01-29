List = {}

-- create
function List.new()
	return {first = 0, last = -1}
end

-- insert in head
function List.pushFront(list, value)
	local first = list.first - 1
	list.first = first
	list[first] = value
end

-- pop in head
function List.popFront(list)
	local first = list.first
	
	-- judge whether it's empty
	if first > list.last then
		error("List is empty")
	end
	
	local value = list[first]
	list[first] = nil
	list.first = first + 1
	return value
end

-- pop in tail
function List.popBack(list)
	local last = list.last
	if list.first > last then
		error("List is empty")
	end
	
	local value = list[last]
	list[last] = nil
	list.last = last - 1
	
	return value
end

-- test
local testList = {first = 0, last = -1}
local tableTest = 12

List.pushFront(testList, tableTest)
print(List.popFront(testList))
	