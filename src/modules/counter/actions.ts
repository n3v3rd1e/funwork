export default present => ({
	increaseCount: count => present({ count: count + 1 }),
	decreaseCount: count => present({ count: count - 1 }),
	resetCount: count => present({ count: 0 }),
})