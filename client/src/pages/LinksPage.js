import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/auth.context'
import {useHttp} from '../hooks/http.hook'
import {LinkList} from '../components/LinkList'

export const LinksPage = () => {
  const [links, setLinks] = useState ([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchlinks = useCallback( async () => {
    try{
      const fetched = await request ('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch(e){

    }
  }, [token, request])

  useEffect( () =>{
    fetchlinks()
  }, [fetchlinks])

  if(loading){
    return <Loader/>
  }
  return (
    <div>
      {!loading && <LinkList links={links} />}
    </div>
  )
}