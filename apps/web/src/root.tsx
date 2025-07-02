// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";
import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import App from "./app";
import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>TravelHub Pro</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Suspense fallback={
                <div class="flex items-center justify-center min-h-screen">
                  <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
                </div>
              }>
                <App />
              </Suspense>
            </Router>
          </QueryClientProvider>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
} 