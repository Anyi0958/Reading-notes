reserved = {
	["white"] = true,
	["end"] = true,
	["function"] = true,
	["local"] = true,
}

for k, v in pairs(reserved) do
	print(k, "->", v)
end