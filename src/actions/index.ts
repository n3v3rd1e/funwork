import CounterActions from "@/modules/counter/actions";

export default present => ({
	...CounterActions(present),
	setTitle: title => present({ title }),
	goTo: route => present({ page: route })
});
