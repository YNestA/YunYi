export default function getRouteKey(routes,name) {
    for(let i=0,l=routes.length;i<l;i++){
        if(routes[i].routeName===name&&routes[i+1]){
            return routes[i+1].key;
        }
    }
    return '';
}