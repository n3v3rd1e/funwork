import Snabbdom from 'snabbdom-jsx';
Snabbdom;

// const Home = () => <div>Home</div>
// const Settings = () => <div>Settings</div>
// const Loading = () => <div>Loading...</div>

// const delayPromise = time => value => {
// 	return new Promise((r, e) => {
// 		setTimeout(() => {
// 			r(value);
// 		}, time);
// 	})
// }

// const delayBytwoSeconds = delayPromise(2000);

// const router = model => {
// 	if (model.page === 'settings') return () => delayBytwoSeconds(Settings);
// 	if (model.page === 'home') return () => delayBytwoSeconds(Home);
// 	if (model.page === 'settings') return () => delayBytwoSeconds(Settings);
// 	defaultLoader: () => () => <div><Loading /> FOOOK</div>,
// 	routes: [
// 		{
// 			path: '/',
// 			component: () => delayBytwoSeconds(Home),
// 			loading: () => Loading
// 		},
// 		{
// 			path: '/settings',
// 			component: () => delayBytwoSeconds(Settings),
// 		}
// 	]
// };

const route = model => model.page;

export default route;
