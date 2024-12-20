import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { userQueryPagerOptions } from '~/api'

export const Route = createFileRoute('/user/pager')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, fetchNextPage, hasNextPage, status, isFetchingNextPage } = useInfiniteQuery(userQueryPagerOptions)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (status === 'pending') {
    return 'loading...'
  }

  return (
    <div className=" h-[200px] overflow-auto">
      <ul>
        { data?.pages.map(page => (
          <React.Fragment key={page.skip}>
            { page.users.map(item => <li key={item.id}>{ item.firstName }</li>) }
          </React.Fragment>
        )) }
      </ul>
      <button ref={ref} type="button" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
      </button>
    </div>
  )
}
