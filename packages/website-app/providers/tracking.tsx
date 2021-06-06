import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'

const TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string

export interface TrackingProps {}

export interface TrackingEvent {
    category?: string
    action: string
    label?: string
}

export interface TrackingValue {
    logEvent: (event: TrackingEvent) => void
}

// @ts-expect-error
const TrackingContext = React.createContext<TrackingValue>()

function TrackingProvider(props: TrackingProps) {
    // if the userId is passed in, we'll need to keep track of any
    // login/logout changes
    // another method is presented below, this will vary depending
    // on your authentication method
    const {} = props

    // we create a default state to keep track of whether GA
    // has been initialized, if we're tracking a unique user,
    // and to hold all of our trackers

    const [analytics, setAnalytics] = useState({
        isInitialized: false,
        hasUser: false,
        trackers: ['myDefaultTracker'],
    })

    // We create a function handle all route changes that occur
    // and track a users movements across pages in our app

    const handleRouteChange = (url) => {
        ReactGA.set({ page: url }, analytics.trackers)
        ReactGA.pageview(url, analytics.trackers)
    }

    // We only want to initialize GA on the client side
    // This will fail if you're trying to initialize server side
    // useEffect will help us handle this case as it only runs
    // client side

    useEffect(() => {
        const { isInitialized, hasUser, trackers } = analytics

        // How you detect which user is currently logged in
        // depends on the way you've set up authentication within
        // your app, the important thing is getting the userId

        // const userId = getUserFromApi()

        // initialize GA with our tracking id
        // uncomment the user tracking method that works for you

        if (!isInitialized) {
            ReactGA.initialize(TRACKING_ID, {
                // ...variousOptions,
                alwaysSendToDefaultTracker: true,
                titleCase: false,
                gaOptions: {
                    // userId: userId,
                    // userId: userIdThatMightChange
                },
            })

            // Handle all route changes

            Router.events.on('routeChangeComplete', handleRouteChange)

            setAnalytics((prev) => ({
                ...prev,
                isInitialized: true,
                // hasUser: Boolean(userId),
            }))

            // in case we dont have the user initially,
            // we handle setting a user in our tracker
        } else if (isInitialized && !hasUser) {
            // ReactGA.set({ userId }, trackers)
            ReactGA.set({}, trackers)

            setAnalytics((prev) => ({
                ...prev,
            }))
        }

        return () => {
            // clean up
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    const logEvent = ({ category = 'website', action = '', label = '' }) => {
        if (analytics.isInitialized) {
            console.log(`[TRACK] ${action}`)
            ReactGA.event(
                {
                    category,
                    action,
                    label,
                },
                analytics.trackers
            )
        }
    }

    return <TrackingContext.Provider value={{ logEvent }} {...props} />
}

const useTracking = () => React.useContext(TrackingContext)

export { TrackingProvider, useTracking }