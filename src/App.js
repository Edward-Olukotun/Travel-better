import Main from './componets/Main';
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools"



const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">

        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <Main />
          </ColorModeProvider>
        </ThemeProvider>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </QueryClientProvider>
  );
}

export default App;
