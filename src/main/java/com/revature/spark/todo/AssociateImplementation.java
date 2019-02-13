package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Product;
import com.revature.spark.beans.Warehouse;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Colin Keiper
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all product assets. Remember that quantity times price is the
	 * total value for a given product.
	 * 
	 * @param products
	 * @return
	 */
	public Double sum(List<Product> products) {
		double ans = 0;
		for(Product i : products) {
			ans += i.getPrice() * i.getQuantity();
		}
		return ans;
	}

	/**
	 * Find the lowest product price out of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double min(List<Product> products) {
		double min = 9001; //initialize current minimum as arbitrarily large
		for(Product i : products) {
			if(i.getPrice()<min) { min = i.getPrice();}
		}
		return min;
	}

	/**
	 * Find the highest product price out of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double max(List<Product> products) {
		double max = 0; //initialize current maximum 
		for(Product i : products) {
			if(i.getPrice() > max) { max = i.getPrice();}
		}
		return max;
	}

	/**
	 * Find the average product price of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double avg(List<Product> products) {
		double len = 0;
		double sum = 0;
		for(Product i : products) {
			sum += i.getPrice(); 
			len++;
		}
		return (sum/len);
	}

	/**
	 * Find the median product price of all products.
	 * 
	 * @param products
	 * @return
	 */
	public Double median(List<Product> products) {
		int len = products.size();
		int count = 0; //iteration variable
		double[] prices = new double[len]; //empty array to store prices
		double median;
		for(Product i : products) { //fill prices array
			System.out.print(i.getPrice());
			prices[count] = i.getPrice();
			count++;
		}
		if(len==1) {return prices[0];}
		prices = bubbleSort(prices); //sort prices least-greatest
		if(len%2==0) {median = prices[(len/2)-1];} //calculates median
		else {median = (prices[(len/2)-1]+prices[(len/2)]) / 2;}
		System.out.println(median);
		return median;
	}

	public double[] bubbleSort(double [] prices) { //standard bubblesort algorithm
		int len = prices.length;
		int swaps = 1;
		double holder;
		while(swaps>0 && len>1) {
			swaps = 0;
			for(int i=0;i<len;i++) {
				if(prices[i] <= prices[i+1]) continue;
				else {
					holder = prices[i];
					prices[i] = prices[i+1];
					prices[i+1] = holder;
					swaps ++;
				}
			}
		}
		for(int i=0;i<len;i++) {
		}
		return prices;
	}

	
	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the total value of all products in each warehouse (total assets).
	 * 
	 * Let's look at some example data:
	 * 
	 * Warehouse A 
	 * Product 	| Price | Quantity 
	 * Rice 	| $3.40 | 8 
	 * Beans 	| $1.50 | 3
	 * ------------------------------------ 
	 * Warehouse B 
	 * Product 	| Price 	| Quantity
	 * TV 		| $50.25 	| 4 
	 * Speaker 	| $15.10 	| 6 
	 * -----------------------------------
	 * Result: 
	 * Warehouse A : $31.70 
	 * Warehouse B : $291.60
	 * 
	 * 
	 * @param products
	 * @return
	 */
	public Map<Warehouse, Double> totalAssetsPerWarehouse(List<Product> products) {
		return null;
	}

}
