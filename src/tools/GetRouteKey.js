export default function getRouteKey(routes,name) {
    for(let i=0,l=routes.length;i<l;i++){
        if(routes[i].routeName=='name'){
            return routes[i].key;
        }
    }
    return '';
}