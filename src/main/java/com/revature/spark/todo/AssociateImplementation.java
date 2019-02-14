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
	public double median(List<Product> products) {
		
		double[] prices = new double[products.size()]; //empty array to store prices
		for(int i=0; i<prices.length;i++) {
			prices[i] = products.get(i).getPrice();
		}
		double holder;
		for(int i = 0; i < prices.length-1; i++) {
			for(int j = 0; j < prices.length-1-i; j++) {
				if(prices[j+1] < prices[j]) {
					holder =prices[j];
					prices[j]=prices[j+1];
					prices[j+1]= holder;
				}
			}
		}
		
		double median;
		if(prices.length==1) {return prices[0];}
		if(prices.length%2==0)
		{median = ((prices[prices.length/2])+(prices[prices.length/2-1]))/2;
		
		}
		
		else {
			median = (prices[(prices.length/2)]);
		
		} //calculates median
		
		return median;
	}


	
	
//	int len = prices.length;
//	int swaps = 1;
//	double holder;
//	while(swaps>0) {
//		swaps = 0;
//		for(int i=0;i<len;i++) {
//			if(prices[i] <= prices[i+1]) continue;
//			else {
//				holder = prices[i];
//				prices[i] = prices[i+1];
//				prices[i+1] = holder;
//				swaps ++;
//			}
//		}
//	}
//	for(int i=0;i<len;i++) {
//	}
//	return prices;
	
	
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
