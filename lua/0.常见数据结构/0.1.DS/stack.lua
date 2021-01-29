local stackMng = {}
stackMng._index = stackMng

-- create stack
function stackMng:new()
	local temp = {}
	setmetatable(temp,stackMng)
	return temp
end

-- initial List
function stackMng:init()
	self.stackList = {}
end

-- reset list
function stackMng:reset()
	self:init()
end

-- clear list
function stackMng:clear()
	self.stackList = {}
end

-- pop one value
function stackMng:pop()
	-- stack is empty
	if #self.stackList == 0 then
		return
	end
	
	-- not empty
	if self.stackList[1] then
		print(self.stackList[1])
	end
	
	return table.remove(self.stackList, 1)
end

-- push one in stack
function stackMng:push(t)
	table.insert(self.stackList, t)
end

-- count list
function stackMng:count()
	return #self.stackList
end

-- main
object = stackMng:new()
object:init()
object:pop()
	
	