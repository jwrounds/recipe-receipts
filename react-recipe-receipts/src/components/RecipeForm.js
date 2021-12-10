import React, { Component } from 'react';
import { Container, Form, Button, Stack, Col, Row } from 'react-bootstrap';
import IngredientList from './IngredientList';
import '../App.css';
import TitleCard from './TitleCard';

export default class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const newRecipe = Object.assign({}, this.props.recipe);
    const value = e.target.value;
    const key = e.target.id;

    /**
     * Captures the correct input and incorporates it into the new recipe object
     *  if 'add' button clicked, otherwise simply incorporates the input that has
     *  changed.
     */

    if (key === 'add') {
      let ingredientVal = e.target.previousElementSibling.value;
      let ingredientId = e.target.previousElementSibling.id;
      newRecipe[ingredientId] = newRecipe[ingredientId].concat(ingredientVal);
      e.target.previousElementSibling.value = '';
    } else {
      newRecipe[key] = value;
    }

    this.props.onFormChange(newRecipe);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  render() {
    return (
      <>
        <Container >
          <TitleCard title="Add Your Recipe" tagline="We know it's going to be delicious"/>
          <Row className="recipe-form">
            <Col sm="auto">
              <h4>Describe your recipe here:</h4>
              <Form id="recipeForm" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Recipe Name:</Form.Label>
                  <Form.Control type="text" id="name" value={this.props.formName} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recipe Description:</Form.Label>
                  <Form.Control as="textarea" id="description" rows={3} value={this.props.formDescription} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recipe instructions:</Form.Label>
                  <Form.Control as="textarea" id="instructions" rows={6} onChange={this.handleChange}/>
                </Form.Group>

                <Stack direction="horizontal" gap={2}>
                  <Form.Group className="mb-3">
                      <Form.Label>Prep Time (minutes):</Form.Label>
                      <Form.Control as="input" type="number" id="prepTimeInMinutes" min="0" max="1000" onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Cooking Time (minutes):</Form.Label>
                      <Form.Control as="input" type="number" id="cookTimeInMinutes" min="0" max="1000" onChange={this.handleChange}/>
                  </Form.Group>
                </Stack>
              </Form>
            </Col>

            <Col sm={4}>
              <h4>Add ingredients and measurements:</h4>
              <Form.Group className="mb-3">
                <Form.Label>Ingredient:</Form.Label>
                <Stack direction="horizontal" gap={3}>
                  <Form.Control type="text" id="ingredientList" />
                  <Button as="input" type="button" variant="secondary" size="sm" id="add" value="Add" onClick={this.handleChange}/>
                </Stack>
              </Form.Group>

              <h5>Your ingredients:</h5>
              <IngredientList formIngredients={this.props.formIngredients}> </IngredientList>
            </Col>
          </Row>
          <Row className="submit-container">
            <Button className="form-submit" variant="primary" size="lg" type="submit" form="recipeForm" onSubmit={this.handleSubmit}>Submit</Button>
          </Row>
        </Container>
      </>
    );
  }
}
