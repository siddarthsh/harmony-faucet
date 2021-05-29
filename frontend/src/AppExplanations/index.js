import React, { useState } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import ReactMarkdown from 'react-markdown';
import './index.css';

export default function AppExplanations() {
    const [expandedItems, setexpandedItems] = useState([]);

    // In case the user expands a node that is barely visible, we scroll the page to display it fully
    function handleExpand(update) {
        if (update.length > expandedItems.length) {
            const newExpandedItemUUID = update[update.length - 1];
            const itemButtonBottom = document
                .getElementById(`accordion__panel-${newExpandedItemUUID}`)
                .getBoundingClientRect().bottom;
            if (itemButtonBottom > window.innerHeight) {
                window.scrollBy(0, itemButtonBottom - window.innerHeight);
            }
        }
        setexpandedItems(update);
    }

    const whatIsAFaucet_help =
        // eslint-disable-next-line
        "A `Faucet` is a tool that provides a small amount of funds to start using a cryptocurrency without having to buy some. \n\
    It's often a shity website with plenty of adds that will send you funds half the time, only after asking you to input your email to send you spam later.  \n\
    `Harmony` had none for its mainnet, so here's one, without the crap you usually get on typical faucets";

    const howMuchCanIGet_help =
        // eslint-disable-next-line
        "`Plenty enough!`  \n\
    Transactions on Harmony network are dirt cheap. Forget Ethereum, forget BSC, we're talking about fractions of a cent for most transactions.  \n\
    So this faucet will only send you `0.001 ONE` - which is enough for you to stake or unstake your tokens to your validators, for instance  \n\
    With `0.001 ONE`, you can do `40` basic transactions on Harmony network ! \n\
    The goal of this faucet is not to make you rich but just to make the onboarding to Harmony smoother.  \n\
    You can use it up to `3 times a day`, for the most clumsy of us 🙄  \n\
    Feel free to send some spare change at `one10u35m0pvfuj548mq552389y92rqcn4nk7gkyvl` to replenish the faucet once you're rich 🦄";

    const howToEarnMoreONE_help =
        // eslint-disable-next-line no-multi-str
        "* First bring your assets from Ethereum/Binance blockchain to Harmony through [the bridge](http://bridge.harmony.one/)  \n\
    Then there's a variety of things you can do:  \n\
    * Swapping assets on [VenomSwap](https://viper.exchange/#/) or [SwoopDEX](https://swoop.exchange/#/swap), the equivalents of `Uniswap` on Harmony \n\
    * Enjoy the same functionalities Ethereum has, only with less friction 🦄  \n\
    ";

    return (
        <Accordion
            allowZeroExpanded
            allowMultipleExpanded
            onChange={handleExpand}
        >
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        What is a Faucet ?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ReactMarkdown
                        className="Explanations"
                        children={whatIsAFaucet_help}
                    ></ReactMarkdown>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        How much can I get ?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ReactMarkdown
                        className="Explanations"
                        children={howMuchCanIGet_help}
                    ></ReactMarkdown>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        How to earn (much) more ONE ?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ReactMarkdown
                        className="Explanations"
                        children={howToEarnMoreONE_help}
                    ></ReactMarkdown>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}
