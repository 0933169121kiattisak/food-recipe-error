import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/recipe';

const App = () => {
  const APP_ID = "d33c17d0";
  const APP_KEY = "a0d53543863a9f23b534319a81016c4f";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&type=public`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.hits);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    getRecipes();
  }, [query], APP_ID,APP_KEY);

  

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }


  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch} >
        <input className='search-bar' type='text' value={search} onChange={updateSearch}></input>
        <button className='search-btn' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}  image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;



