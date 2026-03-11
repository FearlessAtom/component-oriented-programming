import { useState } from "react";
import Card from "../components/Card/Card"
import { get_uuid } from "../utils/utils"

export const Default = { };

export const Alert = {
    args: {
        card: {
            cardImageName: "mr_beast.jpg",
            position: 1,
            cardId: get_uuid(),
        },
        isFlipped: false,
        onFlip: () => alert("Alert"),
    }
}

export const Flip = {
    args: {
        card: {
            cardImageName: "mr_beast.jpg",
            position: 1,
            cardId: get_uuid(),
        },
        isFlipped: false,
    },
    render: (args) => {
        const [isFlipped, setIsFlipped] = useState(args.isFlipped);

        return <Card 
            { ...args }
            isFlipped={ isFlipped }
            onFlip={ () => setIsFlipped(!isFlipped) }
        />
    }
}

const meta = {
    component: Card,
};

export default meta;
