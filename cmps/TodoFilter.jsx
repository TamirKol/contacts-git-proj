import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, isDone, pageIdx } = filterByToEdit

    return (
        <section className="todo-filter">
            <form onSubmit={onSubmitFilter}>
                <div className="filter-input-wrapper">
                    <input
                        onChange={handleChange}
                        value={txt}
                        type="text"
                        placeholder="Search"
                        name="txt"
                    />
                    <div className="fa search"></div>
                </div>
            </form>
            <select name="isDone" value={isDone} onChange={handleChange}>
                <option value="">All</option>
                <option value="false">Active</option>
                <option value="true">Done</option>
            </select>
            <label >
                Page: 
                <input type="number"
                    name="pageIdx"
                    value={pageIdx}
                    onChange={handleChange}
                />
            </label>
        </section>
    )
}