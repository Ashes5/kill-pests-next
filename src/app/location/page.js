'use client'

import {useDispatch,  useSelector} from 'react-redux'
import {pickInput} from "@/lib/features/pest/pestSlice";
import {useRouter} from "next/navigation";


export default function LocationPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { newinput , location} = useSelector((state) => state.pests);

    const handlePick = (itemName) => {

        if (newinput.length < 1) {
            dispatch(pickInput(itemName))
        } else {
            alert('하나만 선택할 수 있습니다.')
        }
        router.push('/killpests');


    }

    const handleNext = () => {
         router.push(`/killpests`)
    }

    return (
        <div className="jo-loc-head">
            <h2 className="jo-lock-h2">해충이 나오는 장소는요 ?</h2>
            <div className="jo-lock-flex">
                {location.map((item) => (
                    <div className="jo-click" key={item.id} onClick={() => handlePick(item.name)}>
                        <div className="jo-loc-boss">
                            <div className="jo-emote">{item.imgName}</div>
                            <p className="jo-loc-p">{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="jo-zmrl">
            </div>
        </div>
    )
}