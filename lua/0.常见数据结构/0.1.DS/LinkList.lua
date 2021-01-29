list = nil
for i =1, 10 do
	list = {next = list, value = i}
end

local l = list
while l do
	print (l.value)
	print(l.list)
	l = l.next
end
