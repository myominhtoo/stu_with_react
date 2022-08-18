export default function useLocalStorage()
{
    function set( key , value )
    {
        localStorage.setItem( key , JSON.stringify(value));
    } 

    function get( key )
    {
        let savedData = localStorage.getItem( key )

        if( savedData == null )
        {
            return null;
        }

        return JSON.parse( savedData );

    }

    function remove( key )
    {
        let savedData = localStorage.getItem( key );

        if( savedData == null )
        {
            return false;
        }

        localStorage.removeItem( key );
        return true;
    }

    function clear()
    {
        localStorage.clear();
    }

    return { set , get , remove , clear }
}