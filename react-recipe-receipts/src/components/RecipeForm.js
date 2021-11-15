import React, { Component } from 'react';
import { Container, Form, Button, Stack, Col, Row } from 'react-bootstrap';
import IngredientList from './IngredientList';

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
      <Container>
        <Row>
          <h1 style={{ padding: "3rem 0", textAlign: "center" }}>Create Your Recipe</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={{ span: 4, offset: 3 }}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Recipe Name:</Form.Label>
                <Form.Control type="text" id="name" value={this.props.formName} onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Recipe Description:</Form.Label>
                <Form.Control as="textarea" id="description" rows={3} value={this.props.formDescription} onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ingredient:</Form.Label>
                <Stack direction="horizontal" gap={3}>
                  <Form.Control type="text" id="ingredients" />
                  <Button as="input" type="button" variant="secondary" size="sm" id="add" value="Add" onClick={this.handleChange}/>
                </Stack>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control size="sm" type="submit" value="Submit" onSubmit={this.handleSubmit}/>
              </Form.Group>
            </Form>
          </Col>

          <Col >
            <IngredientList formIngredients={this.props.formIngredients}> </IngredientList>
          </Col>
        </Row>
    </Container>
    );
  }
}
