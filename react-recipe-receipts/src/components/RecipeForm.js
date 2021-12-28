import React from 'react';
import { Container, Form, Button, Stack, Col, Row } from 'react-bootstrap';
import '../App.css';
import IngredientList from './IngredientList';
import TitleCard from './TitleCard';

export default function RecipeForm(props) {
  return (
    <Container >
      <TitleCard title={props.title} tagline={props.tagline}/>
      <Row className="recipe-form">
        <Col sm="auto">
          <h4>Describe your recipe here:</h4>
          <Form id={props.formId} onSubmit={props.onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Name:</Form.Label>
              <Form.Control type="text" id="name" value={props.recipe.name} onChange={props.onFormChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipe Description:</Form.Label>
              <Form.Control as="textarea" id="description" rows={3} value={props.recipe.description} onChange={props.onFormChange}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Recipe instructions:</Form.Label>
              <Form.Control as="textarea" id="instructions" rows={6} value={props.recipe.instructions} onChange={props.onFormChange}/>
            </Form.Group>

            <Stack direction="horizontal" gap={2}>
              <Form.Group className="mb-3">
                  <Form.Label>Prep Time (minutes):</Form.Label>
                  <Form.Control as="input" type="number" id="prepTimeInMinutes" min="0" max="1000" value={props.recipe.prepTimeInMinutes} onChange={props.onFormChange}/>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Cooking Time (minutes):</Form.Label>
                  <Form.Control as="input" type="number" id="cookTimeInMinutes" min="0" max="1000" value={props.recipe.cookTimeInMinutes} onChange={props.onFormChange}/>
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
              <Button as="input" type="button" variant="secondary" size="sm" id="add" value="Add" onClick={props.onFormChange}/>
            </Stack>
          </Form.Group>

          <h5>Your ingredients:</h5>
          <IngredientList formIngredients={props.recipe.ingredientList}> </IngredientList>
        </Col>
      </Row>
      <Row className="submit-container">
        <Button className="form-submit" variant="primary" size="lg" type="submit" form={props.formId} onSubmit={props.onFormSubmit}>Save</Button>
      </Row>
    </Container>
  );
}
