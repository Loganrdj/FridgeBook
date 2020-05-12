import React, { useState, useContext } from 'react';
import axios from 'axios';
import RecipesList from './RecipesList';
import { GlobalContext } from '../context/GlobalState';
import Inventory from "./Inventory";
import firebase from './firebase.js';


const Main = () => {

  // function returnAll() {
  //   axios.get('/profile').then((response) => {
  //     if (response.data) {
  //       let kitchenArr = [];
  //       for(let i = 0; i < response.data.ingredients.length; i++){
  //         kitchenArr.push(response.data.ingredients[i].name);
  //       }
  //       return kitchenArr;
  //     }
  //   })
  // }

  const [message, setMessage] = useState(
    'Add ingredients then click "Fetch Recipes". Try to add as many ingredients as you can for better results.'
  );
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { ingredients } = useContext(GlobalContext);

  var mergedIngredients = ingredients.map((ingredient) => {
    return encodeURIComponent(ingredient.value);
  });

  var encodedIngredients = mergedIngredients.join();

  const callDatabase= (e) => {
    // console.log(encodedIngredients)
    axios.get('/profile').then((response) => {
      if (response.data) {
        let kitchenArr = [];
        for(let i = 0; i < response.data.ingredients.length; i++){
          let tempVar = response.data.ingredients[i].name.replace(' ','%20');
          kitchenArr.push(tempVar);
        }
        kitchenArr = kitchenArr.join(',')
        encodedIngredients = kitchenArr;
      } else {
        console.log("Profile not found, please log in")
      }

      fetchRecipes(e)
    })
  }

  const fetchRecipes = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage('');
    setLoading(true);
    try {
      const recipes = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedIngredients}&number=30&ranking=2&ignorePantry=false&apiKey=df52bffa937c4efc8c90dfe52995a72f`
      );
      console.log(recipes.data);
      firebase.database().ref().child('recipes').push(recipes.data);

      if (recipes.data.length === 0) {
        setMessage(
          "Darn! Can't find any recipes. Try adding more ingredients."
        );
      } else {
        setMessage('');
      }
      setRecipes(recipes.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setMessage(
        "Darn! It appears we've hit our limit for requests for the day. Please try again tomorrow."
      );
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-60vw lg:max-h-100vh lg:overflow-y-auto flex flex-col justify-between">
      <section className="py-16">
        <div className="px-8 max-w-5xl m-auto">
          <div className="border-b border-gray-400 pb-2 flex justify-between mb-6">
            <h2 className="font-bold text-gray-900 text-3xl">Recipes</h2>
            <button
              onClick={fetchRecipes}
              disabled={loading}
              className="px-3 py-2 rounded-md bg-black-500 text-white focus:outline-none hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? `Fetching Recipes` : `Fetch Recipes from search`}
            </button>
            <button
              onClick={callDatabase}
              disabled={loading}
              className="px-3 py-2 rounded-md bg-black-500 text-white focus:outline-none hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? `Searching...` : `What can I make?`}
            </button>
            
          </div>
          <p className="text-l">{message}</p>
          <RecipesList recipes={recipes} loading={loading} />
        </div>
      </section>
    </div>
  );
};

export default Main;


