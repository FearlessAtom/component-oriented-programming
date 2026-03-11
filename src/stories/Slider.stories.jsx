import Slider from "../components/Slider/Slider";
import { useForm } from "react-hook-form";

export const Default = { };

export const VolumeControl = {
    args: {
        min: 0,
        max: 10,
        initialValue: 5
    },
    render: (args) => {
        const { register } = useForm();
        
        return <Slider { ...args } register={ register("slider") } ></Slider>
    }
};

export const YearPicker = {
    args: {
        min: 1900,
        max: new Date().getFullYear(),
        initialValue: 1990 
    },
    render: (args) => {
        const { register } = useForm();
        
        return <Slider { ...args } register={ register("slider") } ></Slider>
    }
};

const meta = {
    component: Slider,
};

export default meta;
