import React from 'react'
import { Chip } from 'react-materialize'
import '../Cards.css'

const ChipBar = ({ duplicateRecipe, img, text }) => {
    return (
        <div>
            {
                !duplicateRecipe ? <Chip><img src={img} alt={text} /> Added: "{text}"</Chip> :
                    <Chip>Duplicate Recipe. Nothing Added</Chip>
            }
        </div>
    )
}

export default ChipBar