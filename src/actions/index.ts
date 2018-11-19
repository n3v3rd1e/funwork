import CounterActions from "@/modules/counter/actions";

export default present => ({
	// Counter
	...CounterActions(present),

	// Title
	setTitle: title => present({ title })
});
